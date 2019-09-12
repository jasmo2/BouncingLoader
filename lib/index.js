import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Easing, Animated } from 'react-native';
import { styles } from './styles';
const easeOut = Easing.out();
const easeIn = Easing.in();

class BouncingLoader extends PureComponent {
  constructor(props) {
    super(props);
    const { backgroundColor, radius, heightDistance } = props;
    this.state = {
      animatedValue: arrGen(props.circles, () => new Animated.Value(0)),
      circlesArr: arrGen(props.circles, 0),
      currentIndex: -1,
    };
    this.styleDots = {
      backgroundColor: backgroundColor,
      borderRadius: radius,
      height: radius * 2,
      width: radius * 2,
    };
  }
  componentDidMount() {
    this.animate(this.animate);
  }

  animate = callback => {
    const { delay, speed, circles } = this.props;

    const { animatedValue } = this.state;
    const sequenceArr = this.sequenceArr();
    Animated.stagger(delay, sequenceArr).start(val =>
      callback && callback(this.animate);
    });
  };

  sequenceArr = () => {
    const { speed, circles } = this.props;
    const { animatedValue } = this.state;
    const arr = [];

    for (let index = 0; index < circles; index++) {
      arr.push(
        Animated.sequence([
          Animated.timing(animatedValue[index], {
            easeOut,
            duration: speed / 2,
            toValue: 1,
          }),
          Animated.timing(animatedValue[index], {
            easeIn,
            duration: speed / 2,
            toValue: 0,
          }),
        ])
      );
    }

    return arr;
  };

  animatedViews = () => {
    const { backgroundColor, heightDistance, radius } = this.props;
    const { animatedValue, circlesArr } = this.state;

    return circlesArr.map((_, i) => {
      const moveY = animatedValue[i].interpolate({
        inputRange: [0, 1],
        outputRange: [0, heightDistance],
      });
      const animatedView = (
        <Animated.View
          key={i}
          style={[this.styleDots, { transform: [{ translateY: moveY }] }]}
        />
      );
      return animatedView;
    });
  };

  render() {
    const animatedViews = this.animatedViews();

    return <View style={styles.container}>{animatedViews}</View>;
  }
}

BouncingLoader.propTypes = {
  backgroundColor: PropTypes.string,
  circles: PropTypes.number,
  delay: PropTypes.number,
  heightDistance: PropTypes.number,
  radius: PropTypes.number,
  size: PropTypes.number,
  speed: PropTypes.number,
};
BouncingLoader.defaultProps = {
  backgroundColor: 'green',
  circles: 3,
  delay: 400,
  heightDistance: -200,
  radius: 10,
  size: 150,
  speed: 1200,
};

// Private Methods
const arrGen = (count, value) => {
  const arr = new Array(count);
  for (let index = 0; index < count; index++) {
    arr[index] = typeof value === 'function' ? value() : value;
  }
  return arr;
};



export default BouncingLoader;
