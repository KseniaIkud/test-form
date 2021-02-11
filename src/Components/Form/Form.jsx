import React, { useEffect, useState } from 'react';
import './Form.css';

const Form = () => {
    const [isSumbitButtonEnabled, setSubmitButton] = useState(false);
    const [values, setValues] = useState({});
    const onInputChange = {
        onNameChange(e) {
            let copyValues = {
                ...values,
                name: e.target.value
            }
            let nameError = validate(copyValues).name
            if (!nameError || e.target.value === '') {
                setValues(copyValues)
            }
        },
        onEmailChange(e) {
            setValues({
                ...values,
                email: e.target.value
            });
        },
        onTelephoneNumberChange(e) {
            const number = e.target.value
            const digitalsLength = number.replace(/\D+/g,'').length
            if((/^[\d\(\)+-]{0,}$/.test(number) || number === '') && digitalsLength <= 11) {
                setValues({
                    ...values,
                    number
                });
            }
        },
        onLanguageChange(e) {
            setValues({
                ...values,
                language: e.target.innerText
            });
            setDropdown(false);
        },
        onTermsChange(e) {
            setValues({
                ...values,
                termsOfUse: e.target.checked
            });
        }
    };
    const validate = (values) => {
        const errors = {};
        const regexPatterns = {
            email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            name: /^[a-zA-Zа-яА-Я \-]{1,}$/,
            number: /^(\+)?([-()+]?\d[-()+]?){11,}(\s*)?$/
        }
        if(!regexPatterns.email.test(values.email)) {
            errors.email = "Введено некорректное значение";
        }
        if(!regexPatterns.name.test(values.name)) {
            errors.name = "Введено некорректное значение";
        } 
        if(!regexPatterns.number.test(values.number)) {
            errors.number = "Введено некорректное значение";
        }
        if (values.number && values.number.replace(/\D+/g,'').length != 11) {
            errors.number = "Введено некорректное значение";
        }
        if(!values.language) {
            errors.language = "Не выбран язык";
        }
        if(!values.termsOfUse) {
            errors.termsOfUse = "Не приняты условия соглашения";
        }
        return errors;
    };
    
    useEffect(() => {
        const errors = validate(values);
        let isError = false
        for (let key in errors) {
            isError = true
        }
        if (values.name && !isError) {
            setSubmitButton(true)
        } else {
            setSubmitButton(false)
        }
    }, [values]);
   
    const [isDropdownOpen, setDropdown] = useState(false);
    return <form className="form">
        <div className="form__header">
            <div className="form__title">
                Регистрация
            </div>
            <div className="form__is-account">
                Уже есть аккаунт?
                <a href="#" className="form__link"> Войти</a>
            </div>
        </div>
        <div className="form__body">
            <div>
                <label className="form__label" htmlFor="fullName">Имя</label>
                <input className="form__input" type="text" id="FullName" 
                    placeholder="Введите Ваше имя"
                    value={values.name || ''} 
                    onChange={onInputChange.onNameChange}/>
                <div className="form__message">
                    <div className="form__error">
                        {validate(values).name}
                    </div>
                </div>
                
            </div>
            <div>
                <label className="form__label" htmlFor="email">Email</label>
                <input className="form__input" type="email" id="email" 
                    placeholder="Введите ваш email"
                    value={values.email || ''}
                    onChange={onInputChange.onEmailChange}/>
                <div className="form__message">
                    <div className="form__error">
                        {values.email && validate(values).email}
                    </div>
                </div>
            </div>
            <div>
                <label className="form__label" htmlFor="telephoneNumber">Номер телефона</label>
                <input className="form__input" type="text" id="telephoneNumber" 
                    placeholder="Введите номер телефона"
                    value={values.number || ''}
                    onChange={onInputChange.onTelephoneNumberChange}/>
                <div className="form__message">
                    <div className="form__error">
                        {values.number && validate(values).number}
                    </div>
                    
                </div>
            </div>
            <div>
                <label className="form__label" htmlFor="language">Язык</label>
                <input className="form__input form__input_expand" id="language" 
                    placeholder="Язык" readOnly
                    onClick={() => setDropdown(true)}
                    onBlur={() => setTimeout(setDropdown, 150, false)} 
                    value={values.language || ''}/>
                <nav className={`language-dropdown ${isDropdownOpen && "language-dropdown_open"}`} >
                    <ul className="language-dropdown__list">
                        <li onClick={onInputChange.onLanguageChange} 
                            className="language-dropdown__link">Русский</li>
                        <li onClick={onInputChange.onLanguageChange} 
                            className="language-dropdown__link">Английский</li>
                        <li onClick={onInputChange.onLanguageChange} 
                            className="language-dropdown__link">Китайский</li>
                        <li onClick={onInputChange.onLanguageChange} 
                            className="language-dropdown__link">Испанский</li>
                    </ul>
                </nav>
            </div>
            <div>
                <input className="form__checkbox" type="checkbox" id="termsOfUse" 
                    onClick={onInputChange.onTermsChange}/>
                <label className="form__label" htmlFor="termsOfUse">Принимаю <a href="#" className="form__link">условия</a> использования</label>
                <div className="form__message">
                    <div className="form__error">
                        {(values.termsOfUse === false) && validate(values).termsOfUse}
                    </div>
                </div>
            </div>
            <button disabled={!isSumbitButtonEnabled} className="form__submit">
                Зарегистрироваться
            </button>
        </div>
    </form>
};

export default Form;

