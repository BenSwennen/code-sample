import React from "react";
import { storiesOf } from "@storybook/react";
import Card, { BlockGroup, CardActions, CardBlock, CardTitle } from ".";
import { Column, Container } from "../Grid";
import Dropdown, { DropdownButton } from "../Dropdown";
import FormButton from "../FormButton/";

const buttonClick = () =>
  console.log("Button clicked"); // eslint-disable-line

const selectInput = selectedInput =>
  console.log(selectedInput); // eslint-disable-line

storiesOf("Card", module)
  .add("Simple", () => (
    <div>
      <Card>
        <CardBlock>
          <CardTitle title="Enquiry Details" />
          <CardActions>
            <FormButton
              label="Save Changes"
              type="save"
              onClick={buttonClick}
            />
            <FormButton
              label="Cancel"
              type="cancel"
              onClick={buttonClick}
            />
          </CardActions>
        </CardBlock>
        <CardBlock>
          This is a card
        </CardBlock>
      </Card>
    </div>
  ))

  .add("Full Example", () => (
    <div>
      <Card>
        <CardBlock>
          <CardTitle title="Enquiry Details" />
          <CardActions>
            <FormButton
              label="Save Changes"
              type="save"
              onClick={buttonClick}
            />
            <FormButton
              label="Cancel"
              type="cancel"
              onClick={buttonClick}
            />
          </CardActions>
        </CardBlock>
        <BlockGroup>
          <Container>
            <Column span="4">
              <CardBlock>
                <fieldset>
                  <label>Size</label>
                </fieldset>
                <fieldset>
                  <label>Location</label>
                  <input type="text" />
                </fieldset>
              </CardBlock>
            </Column>
            <Column span="4">
              <CardBlock>
                <fieldset>
                  <label>Type</label>
                  <Dropdown
                    inputComponent={DropdownButton}
                    inputValueExtractor={v => v}
                    onChange={selectInput}
                    values={["Expansion", "Renewal", "Expiry"]}
                    valueExtractor={v => ({ label: v })}
                    selectedValues={["Expansion"]}
                  />
                </fieldset>
                <fieldset>
                  <label>Reason for moving</label>
                  <input type="text" />
                </fieldset>
              </CardBlock>
            </Column>
            <Column span="4">
              <CardBlock>
                <fieldset>
                  <label>Start Date</label>
                  <input type="date" />
                </fieldset>
                <fieldset>
                  <label>Budget</label>
                  <input type="text" />
                </fieldset>
              </CardBlock>
            </Column>
            <Column span="4">
              <CardBlock>
                <fieldset>
                  <label>Industry</label>
                  <Dropdown
                    inputComponent={DropdownButton}
                    inputValueExtractor={v => v}
                    onChange={selectInput}
                    values={["Health", "Real Estate", "Technology"]}
                    valueExtractor={v => ({ label: v })}
                    selectedValues={["Real Estate"]}
                  />
                </fieldset>
              </CardBlock>
            </Column>
          </Container>
        </BlockGroup>
      </Card>
    </div>
  ));
