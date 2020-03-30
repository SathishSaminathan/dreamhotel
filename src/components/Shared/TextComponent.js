import React from 'react';
import {Text} from 'react-native';

import {FontType} from '../../constants/AppConstants';

const TextComponent = props => {
  const {children, style, type} = props;
  const getFontFamily = type => {
    switch (type) {
      case FontType.REGULAR:
        return 'OpenSans-Regular';
      case FontType.LIGHT:
        return 'OpenSans-Light';
      case FontType.BOLD:
      default:
        return 'OpenSans-Bold';
    }
  };
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: getFontFamily(type),
          fontSize: 12,
          // fontWeight: '100',
          // color: colors.primaryColor,
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default TextComponent;

TextComponent.defaultProps = {
  type: FontType.REGULAR,
};
