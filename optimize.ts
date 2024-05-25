const isFocused = true
const type = 'tel'
const prefix = false
const size = 'md'


const commonStyles = {
    labelTransmissionStyle: 'labelTransmissionStyle',
    labelTransmissionSmSizeStyle: 'labelTransmissionSmSizeStyle',
    inputLabelTransissionStyle: 'inputLabelTransissionStyle',
    inputLabelTransissionSmSizeStyle: 'inputLabelTransissionSmSizeStyle',
}


// Method 1: using ternary
const answer1 = isFocused
    ? type === 'tel'
        ? prefix
            ? size === 'sm'
                ? commonStyles.labelTransmissionSmSizeStyle
                : commonStyles.labelTransmissionStyle
            : size === 'sm'
                ? commonStyles.inputLabelTransissionSmSizeStyle
                : commonStyles.inputLabelTransissionStyle
        : prefix
            ? size === 'sm'
                ? commonStyles.labelTransmissionSmSizeStyle
                : commonStyles.labelTransmissionStyle
            : size === 'sm'
                ? commonStyles.inputLabelTransissionSmSizeStyle
                : commonStyles.inputLabelTransissionStyle
    : ''


// Method 2:
const labelStyle = prefix ? commonStyles.labelTransmissionStyle : commonStyles.inputLabelTransissionStyle
const labelSmSizeStyle = prefix ? commonStyles.labelTransmissionSmSizeStyle : commonStyles.inputLabelTransissionSmSizeStyle

isFocused
    ? type === 'tel'
        ? size === 'sm'
            ? labelSmSizeStyle
            : labelStyle
        : size === 'sm'
            ? commonStyles.inputLabelTransissionSmSizeStyle
            : commonStyles.inputLabelTransissionStyle
    : ''


console.log({
    answer1,
    answer2
})