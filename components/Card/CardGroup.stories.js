import React from "react";
import { storiesOf } from "@storybook/react";
import Card, { CardBlock, CardGroup, CardTitle } from ".";
import { Column, Container, VerticalSeparator, HorizontalSeparator } from "../Grid";

storiesOf("CardGroup", module)

  .add("No borders", () => (
    <div>
      <CardGroup>
        <Container>
          <Column span="3">
            <Card>
              <CardBlock>
                <CardTitle title="Card 1" />
              </CardBlock>
            </Card>
          </Column>
          <Column span="4">
            <Card>
              <CardBlock>
                <CardTitle title="Card 2" />
              </CardBlock>
            </Card>
          </Column>
          <Column span="9">
            <Card>
              <CardBlock>
                <CardTitle title="Card 3" />
              </CardBlock>
            </Card>
          </Column>
          <Column span="16">
            <Card>
              <CardBlock>
                <CardTitle title="Card 4" />
              </CardBlock>
            </Card>
          </Column>
        </Container>
      </CardGroup>
    </div>
  ))

  .add("Borders", () => (
    <div>
      <CardGroup>
        <Container>
          <Column span="3">
            <Card>
              <CardBlock>
                <CardTitle title="Card 1" />
              </CardBlock>
            </Card>
          </Column>
          <VerticalSeparator />
          <Column span="4">
            <Card>
              <CardBlock>
                <CardTitle title="Card 2" />
              </CardBlock>
            </Card>
          </Column>
          <VerticalSeparator />
          <Column span="9">
            <Card>
              <CardBlock>
                <CardTitle title="Card 3" />
              </CardBlock>
            </Card>
          </Column>
          <HorizontalSeparator />
          <Column span="16">
            <Card>
              <CardBlock>
                <CardTitle title="Card 4" />
              </CardBlock>
            </Card>
          </Column>
        </Container>
      </CardGroup>
    </div>
  ));
