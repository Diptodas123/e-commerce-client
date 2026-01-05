import React, { useState } from 'react'
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Eye, EyeOff } from 'lucide-react';

const types = {
    INPUT: 'input',
    SELECT: 'select',
    TEXTAREA: 'textarea',
}

const CommonForm = ({
    formControls,
    formData,
    setFormData,
    onSubmit,
    buttonText,
    disableSubmitButton
}) => {
    
    // State to manage password visibility
    const [showPassword, setShowPassword] = useState({});

    const togglePasswordVisibility = (fieldName) => {
        setShowPassword(prev => ({
            ...prev,
            [fieldName]: !prev[fieldName]
        }));
    };

    const renderInputsByComponentType = (getControlItem) => {
        let element = null;
        const value = formData[getControlItem.name] || '';

        switch (getControlItem.componentType) {
            case types.INPUT: {
                const isPassword = getControlItem.type === 'password';
                const inputType = isPassword && showPassword[getControlItem.name] ? 'text' : getControlItem.type;

                element = (
                    <div className="relative">
                        <Input
                            name={getControlItem.name}
                            placeholder={getControlItem.placeholder}
                            id={getControlItem.name}
                            type={inputType}
                            value={value}
                            onChange={(e) => setFormData({
                                ...formData,
                                [getControlItem.name]: e.target.value
                            })}
                            className={isPassword ? 'pr-10' : ''}
                        />
                        {/* Show/Hide Password Toggle */}
                        {isPassword && (
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility(getControlItem.name)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showPassword[getControlItem.name] ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        )}
                    </div>
                );
                break;
            }

            case types.SELECT:
                element = (
                    <Select value={value}
                        onValueChange={(selectedValue) => setFormData({
                            ...formData,
                            [getControlItem.name]: selectedValue
                        })}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={getControlItem.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                getControlItem?.options?.length ?
                                    getControlItem.options.map((optionItem) => (
                                        <SelectItem key={optionItem.id} value={optionItem.id}>
                                            {optionItem.label}
                                        </SelectItem>
                                    ))
                                    : null
                            }
                        </SelectContent>
                    </Select>
                );
                break;

            case types.TEXTAREA:
                element = (
                    <Textarea
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        value={value}
                        onChange={(e) => setFormData({
                            ...formData,
                            [getControlItem.name]: e.target.value
                        })}
                    />
                );
                break;

            default:
                element = (
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                        value={value}
                        onChange={(e) => setFormData({
                            ...formData,
                            [getControlItem.name]: e.target.value
                        })}
                    />
                );
        }
        return element;
    }

    return (
        <form onSubmit={onSubmit}>
            <div className='flex flex-col gap-3'>
                {/* Form Controls */}
                {
                    formControls?.map((controlItem, index) => (
                        <div key={index} className='grid w-full gap-1.5'>
                            <Label className="mb-1">{controlItem.label}</Label>
                            {/* Render Input Based on Component Type */}
                            {
                                renderInputsByComponentType(controlItem)
                            }
                        </div>
                    ))
                }
            </div>
            {/* Submit Button */}
            <Button type="submit" className='mt-3 w-full' disabled={disableSubmitButton}>
                {buttonText || 'Submit'}
            </Button>
        </form>
    )
}

export default CommonForm;