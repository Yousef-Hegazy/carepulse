/* eslint-disable no-unused-vars */
import type { E164Number } from "libphonenumber-js/core";
import ReactDatePicker from "react-datepicker";
import { Controller, type ControllerProps, type FieldValues } from "react-hook-form";
import PhoneInput from "react-phone-number-input";

import type { InputHTMLAttributes } from "react";
import { Checkbox } from "./ui/checkbox";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

interface CustomProps {
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: FormFieldType;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  onlyPast?: boolean; // For date picker, restrict to past and dates only,
  onlyFuture?: boolean; // For date picker, restrict to future dates only
  noPast?: boolean; // For date picker, restrict to future and present dates
  noFuture?: boolean; // For date picker, restrict to past and present dates
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex items-center rounded-md border border-dark-500 bg-dark-400 px-4">
          {props.iconSrc && (
            <img src={props.iconSrc} height={24} width={24} alt={props.iconAlt || "icon"} className="size-5" />
          )}
          {props.icon && props.icon}
          <Input placeholder={props.placeholder} {...field} className="shad-input border-0" type={props.type} />
          {props.endIcon && props.endIcon}
        </div>
      );
    case FormFieldType.TEXTAREA:
      return (
        <Textarea placeholder={props.placeholder} {...field} className="shad-textArea" disabled={props.disabled} />
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <PhoneInput
          defaultCountry="US"
          placeholder={props.placeholder}
          international
          withCountryCallingCode
          value={field.value as E164Number | undefined}
          onChange={field.onChange}
          className="input-phone"
        />
      );
    case FormFieldType.CHECKBOX:
      return (
        <div className="flex items-center gap-4">
          <Checkbox id={props.name} checked={field.value} onCheckedChange={field.onChange} />
          <label htmlFor={props.name} className="checkbox-label">
            {props.label}
          </label>
        </div>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400 gap-2 ps-4">
          <img src="/assets/icons/calendar.svg" height={24} width={24} alt="user" />
          <ReactDatePicker
            showTimeSelect={props.showTimeSelect ?? false}
            selected={field.value}
            onChange={(date: any) => field.onChange(date)}
            timeInputLabel="Time:"
            dateFormat={props.dateFormat ?? "yyyy/MM/dd"}
            wrapperClassName="date-picker"
            maxDate={
              props.onlyPast
                ? new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1)
                : props.noFuture
                  ? new Date()
                  : undefined
            }
            minDate={
              props.onlyFuture
                ? new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)
                : props.noPast
                  ? new Date()
                  : undefined
            }
          />
        </div>
      );
    case FormFieldType.SELECT:
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <Field>
            <SelectTrigger className="shad-select-trigger">
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
          </Field>
          <SelectContent className="shad-select-content">{props.children}</SelectContent>
        </Select>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    default:
      return null;
  }
};

interface CustomFormFieldProps<T extends FieldValues> extends Omit<ControllerProps<T>, "render"> {}

const CustomFormField = <T extends FieldValues>(props: CustomFormFieldProps<T> & CustomProps) => {
  const { control, name, label } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error, invalid } }) => (
        <Field className="flex-1">
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FieldLabel className="shad-input-label">{label}</FieldLabel>
          )}

          <RenderInput field={field} props={props} />

          {invalid ? <FieldError className="shad-error" errors={[error]} /> : null}
        </Field>
      )}
    />
  );
};

export default CustomFormField;
