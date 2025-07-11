import React, { FC } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { NumericFormat, NumberFormatValues, NumericFormatProps } from 'react-number-format';

interface NumericInputProps {
    name: string;
    label: string;
    fullWidth?: boolean;
    onChange: (event: { target: { name: string; value: string } }) => void;
    value: string;
    required?: boolean;
}


const CustomTextField = React.forwardRef<TextFieldProps, TextFieldProps & {
    value: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}>(({ name, onChange, value, ...other }, ref) => (
    <TextField
        {...other}
        name={name}
        onChange={onChange}
        value={value}
        inputRef={ref}
    />
));

const NumericInput: FC<NumericInputProps> = (props) => {
    const { name, label, fullWidth, onChange, value, ...otherProps } = props;

    return (
        <NumericFormat
            // Essas props são para o NumericFormat
            customInput={CustomTextField}
            onValueChange={(values: NumberFormatValues) => {
                onChange({
                    target: {
                        name: name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            decimalScale={2}
            fixedDecimalScale
            // Essas props são para o CustomTextField
            name={name}
            label={label}
            fullWidth={fullWidth}
            value={value}
            required={otherProps.required}
            {...otherProps}
        />
    );
};

export default NumericInput;