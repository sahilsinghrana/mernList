import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import { PropTypes } from "prop-types";

class ShoppingList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item;

    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name }) => {
              if (
                name.toLowerCase().includes("faizal") ||
                name.toLowerCase().includes("sarath") ||
                name.toLowerCase().includes("nilesh") ||
                name.toLowerCase().includes("ankush") ||
                name.toLowerCase().includes("button") ||
                name.toLowerCase().includes("vatsal") ||
                name.toLowerCase().includes("yuvraj")
              ) {
                return (
                  <CSSTransition key={_id} timeout={500} classNames="fade">
                    <ListGroupItem>
                      <Button
                        className="remove-btn"
                        color="dark"
                        size="sm"
                        // onClick={this.onDeleteClick.bind(this, _id)}
                      >
                        &times;
                      </Button>
                      {name}
                    </ListGroupItem>
                  </CSSTransition>
                );
              }

              return (
                <CSSTransition key={_id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                    {name}
                  </ListGroupItem>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});
export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
