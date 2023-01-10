import {StylePropsType} from './canvas.types'

export const getStyleFromProps = ({w, bgColor, padding}: StylePropsType) => {
    return {
        width: `${w}px`,
        backgroundColor: bgColor,
        padding,
    }
}