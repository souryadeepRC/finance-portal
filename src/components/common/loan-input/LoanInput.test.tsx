import { fireEvent, render, screen } from "@testing-library/react";
// component
import { LoanInput } from "./LoanInput";

test("Loan Input label check", () => {
  render(
    <LoanInput
      id="testInput"
      label="Test Input Label"
      value={10}
      minValue={1}
      maxValue={100}
      adornmentIcon={<span>%</span>}
      onChange={() => {}}
    />
  );
  const element = screen.queryAllByLabelText("Test Input Label");
  expect(element).not.toHaveLength(0);
});
describe("Loan Input value check", () => {
  const onValueChange = jest.fn();
  let element: any;
  beforeEach(() => {
    render(
      <LoanInput
        id="testInput"
        label="Test Input"
        value={10}
        minValue={10}
        maxValue={100}
        onChange={onValueChange}
      />
    );
    element = screen.getByTestId("testInput") as HTMLInputElement;
  });
  it("input value should be 10", () => {
    expect(screen.getByText(10)).toBeInTheDocument();
    expect(element).toBeInTheDocument();
    expect(element.value).toEqual("10");
  });
  it("onchange should call with updated value with input value change", () => {
    fireEvent.change(element, { target: { value: "15" } });
    expect(onValueChange).toBeCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith({
      id: "testInput",
      value: 15,
    });
  });
  it("error msg should show for input 0", () => {
    render(
      <LoanInput
        id="testInput"
        label="Test Input"
        value={0}
        onChange={onValueChange}
      />
    );
    const errorMsgElement = screen.getByText("Provide positive non-zero number");
    expect(errorMsgElement).toBeInTheDocument();
    expect(errorMsgElement).toHaveTextContent(
      "Provide positive non-zero number"
    );
    expect(errorMsgElement).toHaveClass("Mui-error");
  });
  it("input value should limit to max and min value", () => {
    // min test
    fireEvent.change(element, { target: { value: "9" } });
    // max test
    fireEvent.change(element, { target: { value: "101" } });

    fireEvent.change(element, { target: { value: "55" } });
    expect(onValueChange).toBeCalledTimes(1);
    expect(onValueChange).toBeCalledWith({
      id: "testInput",
      value: 55,
    });
  });
  it("more than one dot should not be accepted", () => {
    const id = "decimalInput";
    render(
      <LoanInput
        id={id}
        label="Test Input"
        textValue={"8.5"}
        value={8.5}
        minValue={5}
        maxValue={100}
        onChange={onValueChange}
      />
    );
    const decimalInput = screen.getByTestId(id) as HTMLInputElement;
    fireEvent.change(decimalInput, { target: { value: "9.5.1" } });
    fireEvent.change(decimalInput, { target: { value: "9.1" } });
    fireEvent.change(decimalInput, { target: { value: "9..1" } });

    expect(onValueChange).toBeCalledTimes(1);
    expect(onValueChange).toBeCalledWith({
      id,
      value: 9.1,
      textValue: "9.1",
    });
  });
  it("text character should not be accepted", () => {
    fireEvent.change(element, { target: { value: "abc" } });
    expect(onValueChange).not.toBeCalled();
    fireEvent.change(element, { target: { value: "a1b2c" } });
    expect(onValueChange).not.toBeCalled();
    fireEvent.change(element, { target: { value: "1a2b3c4" } });
    expect(onValueChange).not.toBeCalled();
    fireEvent.change(element, { target: { value: "57" } });
    expect(onValueChange).toHaveBeenCalledWith({
      id: "testInput",
      value: 57,
    });
  });
});
describe("loan Input Slider value check", () => {
  const onValueChange = jest.fn();
  let element: any;
  beforeEach(() => {
    render(
      <LoanInput
        id="testInput"
        label="Test Input"
        value={10}
        minValue={10}
        maxValue={100}
        onChange={onValueChange}
      />
    );
    element = screen.getByTestId("testInput") as HTMLInputElement;
  });
  it("slider input value check", () => {
    fireEvent.change(element, { target: { value: 45 } });
    expect(onValueChange).toBeCalledWith({
      id: "testInput",
      value: 45,
    });
  });
  it("slider input max min value check", () => {
    // min test
    fireEvent.change(element, { target: { value: "9" } });
    // max test
    fireEvent.change(element, { target: { value: "101" } });

    fireEvent.change(element, { target: { value: "55" } });
    expect(onValueChange).toBeCalledTimes(1);
    expect(onValueChange).toBeCalledWith({
      id: "testInput",
      value: 55,
    });
  });
});
