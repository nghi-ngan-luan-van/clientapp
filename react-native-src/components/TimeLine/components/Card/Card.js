import React from "react";
import PropTypes from "prop-types";
import { Text, View, TouchableOpacity } from "react-native";
import moment from "moment";
import Androw from "react-native-androw"
import styles, {
  _cardContainer,
  _cardShadowContainer,
  _titleStyle,
  _subtitleStyle,
  _dateStyle,
  _shadowStyle
} from "./Card.style";
import { isAndroid } from "@freakycoder/react-native-helpers";

const Card = props => {
  const {
    data,
    date,
    title,
    isCard,
    subtitle,
    dateStyle,
    titleStyle,
    shadowColor,
    subtitleStyle,
    dateFontColor,
    titleFontColor,
    dateFontFamily,
    titleFontFamily,
    subtitleFontColor,
    subtitleFontFamily,
    cardBackgroundColor
  } = props;
  const _onPress = () => {
    let {onPress} = props;
    typeof onPress == "function" && onPress(data);
  }
  return (
    <Androw style={[styles.container, isAndroid && _shadowStyle(isCard, shadowColor, cardBackgroundColor)]}>
      <Androw style={_cardContainer(isCard, shadowColor, cardBackgroundColor)}>
        <TouchableOpacity style={styles.cardContainerGlue} onPress={_onPress}>
          <Text
            numberOfLines={1}
            style={titleStyle || _titleStyle(titleFontColor, titleFontFamily)}
          >
            {data.title}
          </Text>
          <Text
            numberOfLines={2}
            style={
              subtitleStyle ||
              _subtitleStyle(subtitleFontColor, subtitleFontFamily)
            }
          >
            {data.subtitle}
          </Text>
        </TouchableOpacity>
      </Androw>
      <Text
        numberOfLines={1}
        style={dateStyle || _dateStyle(dateFontColor, dateFontFamily, isCard)}
      >
        {moment(data.date).format("DD ddd, HH:mm")}
      </Text>
    </Androw>
  );
};

Card.propTypes = {
  date: PropTypes.string,
  isCard: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  shadowColor: PropTypes.string,
  dateFontColor: PropTypes.string,
  dateFontFamily: PropTypes.string,
  titleFontColor: PropTypes.string,
  subtitleFontColor: PropTypes.string,
  subtitleFontFamily: PropTypes.string,
  cardBackgroundColor: PropTypes.string
};

Card.defaultProps = {
  isCard: true,
  shadowColor: "#000",
  date: "Tue 16, 19:09",
  dateFontColor: "#ccc",
  titleFontColor: "#556084",
  cardBackgroundColor: "#fff",
  subtitleFontColor: "#8c93ab",
  title: "React Native Beautiful Timeline",
  subtitle: "Etiam volutpat ligula metus, quis."
};

export default Card;
