import React from "react";
import renderer from "react-test-renderer";

import Card from "../Card";
import CardActions from "../CardActions";
import CardTitle from "../CardTitle";
import CardBlock from "../CardBlock";

describe("<Card />", () => {
  it("renders a card with children", () => {
    const component = renderer.create(
      <Card>
        <CardBlock>
          <CardTitle title="This is a title" />
          <CardActions />
        </CardBlock>
        <CardBlock>
          This is a card
        </CardBlock>
      </Card>
    ).toJSON();

    expect(component).toMatchSnapshot();
  });
});
