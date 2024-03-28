import {StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
function PickerIos({value, onSetValue, items}) {
  return (
    <RNPickerSelect
      placeholder={{label: 'Select a machine', value: ''}}
      items={items}
      onValueChange={(value) => onSetValue(value)}
      value={value}
      style={pickerSelectStyles}
    />
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    minWidth: 200,
  },
});

export default PickerIos;
