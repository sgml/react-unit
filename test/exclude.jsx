// Note: you should use var createComponent = require('react-unit');
var createComponent = require('./react-unit');
var React = require('react');

var Item = React.createClass({
  render: function() {
    return <span>{this.props.children}</span>
  }
});

var Items = React.createClass({
  render: function() {
    return <div>{this.props.children}</div>
  }
});


describe('exclude', () => {
  it('can "skip" a component using createComponent directly', () => {
    var component = createComponent.exclude(Item)
      (
        <Items>
          <Item>1</Item>
          <Item>2</Item>
          <Item>3</Item>
          <Item>4</Item>
        </Items>
      );

    var found = component.findByQuery('span:contains(0)');

    expect(found.length).toEqual(0);
  });

  it('can reverts skip after run once', () => {

    var component = createComponent(
      <Items>
        <Item>1</Item>
        <Item>2</Item>
        <Item>3</Item>
        <Item>4</Item>
      </Items>
    );

    var found = component.findByQuery('span:contains(1)');

    expect(found.length).toEqual(1);
  });

  it('can "skip" a component using createComponent.shallow', () => {
    var component = createComponent.exclude(Item).shallow(<Item>1</Item>);

    var found = component.findByQuery('span:contains(0)');

    expect(found.length).toEqual(0);
  });

  it('can "skip" a component using createComponent.interleaved', () => {
    var component = createComponent.exclude(Item).interleaved(
      <Items>
        <Item>1</Item>
        <Item>2</Item>
        <Item>3</Item>
        <Item>4</Item>
      </Items>
    );

    var found = component.findByQuery('span:contains(0)');

    expect(found.length).toEqual(0);
  });
});