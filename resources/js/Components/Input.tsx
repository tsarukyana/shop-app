import classNames from "classnames";
import { ChangeEvent, FC, FocusEvent, KeyboardEvent } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

type TInputProps = {
    type: "text" | "number" | "password" | 'email';
    name: string;
    value?: string;
    register?: any;
    disabled?: boolean;
    maxLength?: number;
    minLength?: number;
    autoComplete?: any;
    placeholder?: string;
    className?: string;
    onBlur?: (data: FocusEvent<HTMLInputElement>) => void;
    onFocus?: (data: FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (data: KeyboardEvent<HTMLInputElement>) => void;
    onChange?: (
        value: string | number,
        event: ChangeEvent<HTMLInputElement>
        ) => void;
        error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
};

const Input: FC<TInputProps> = ({
    name,
    value,
    error,
    onBlur,
    onFocus,
    register,
    disabled,
    onChange,
    maxLength,
    minLength,
    onKeyDown,
    type = "text",
    className = "",
    placeholder = "",
    autoComplete = "off",
}) => {
    const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      onChange?.(value, e)
    }

    const onBlurHandler = (e: FocusEvent<HTMLInputElement>) => {
      onBlur?.(e)
    }

    const onFocusHandler = (e: FocusEvent<HTMLInputElement>) => {
      onFocus?.(e)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(e)
    }


    const onRegisterChangeCallback = {
        onChange: onChangeValueHandler,
        onBlur: onBlurHandler,
    };

    return (
        <div className="flex flex-col gap-2">
            <input
                name={name}
                type={type}
                value={value}
                disabled={disabled}
                maxLength={maxLength}
                minLength={minLength}
                onBlur={onBlurHandler}
                onFocus={onFocusHandler}
                placeholder={placeholder}
                autoComplete={autoComplete}
                onKeyDown={onKeyDownHandler}
                onChange={onChangeValueHandler}
                className={classNames(
                    "border text-black text-md font-normal py-3 px-[14px] rounded-lg max-w-[570px] w-full",
                    {
                        [className]: className,
                        ["focus:outline-none focus:ring focus:ring-error focus:border-error"]:
                            error,
                    }
                )}
                {...(register
                    ? register(name, onRegisterChangeCallback)
                    : null)}
            />

            <p className="text-error">{error}</p>
        </div>
    );
};

export default Input;
