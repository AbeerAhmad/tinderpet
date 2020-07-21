import React from 'react';
import PropTypes from 'prop-types';
import {Item, Input, Icon} from 'native-base';

export const InputField = ({
  placeholder,
  onChangeHandler,
  fieldValue,
  error,
  ...props
}) => {
  return (
    <Item
      error={error.status}
      rounded
      style={{backgroundColor: 'white', marginVertical: 10}}>
      <Input
        placeholder={placeholder}
        onChangeText={value => onChangeHandler(value)}
        value={fieldValue}
        {...props}
      />
      {error.status ? <Icon type="MaterialIcons" name="error" /> : null}
    </Item>
  );
};

InputField.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  fieldValue: PropTypes.string.isRequired,
  error: PropTypes.object,
};
