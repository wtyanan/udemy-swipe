import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder
} from 'react-native';

class Deck extends Component {
  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: () => {}
    });

    this.state = { panResponder, position };
  }

  renderCards() {
    return this.props.data.map((card, index) => {
      if (index === 0) {
        return (
          <Animated.View
            key={card.id}
            {...this.state.panResponder.panHandlers}
            style={this.state.position.getLayout()}
          >
            {this.props.renderCard(card)}
          </Animated.View>
        );
      }

      return this.props.renderCard(card);
    });
  }

  render() {
    return (
      <View>{this.renderCards()}</View>
    );
  }
}

export default Deck;