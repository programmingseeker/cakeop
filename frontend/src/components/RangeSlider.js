import React from "react";

class RangeSlider extends React.Component {
  state = {
    sliderWidth: 0,
    offsetSliderWidht: 0,
    // eslint-disable-next-line
    min: 0,
    // eslint-disable-next-line
    max: 1000,
    // eslint-disable-next-line
    minValueBetween: 10,
    // eslint-disable-next-line
    currentMin: 50,
    // eslint-disable-next-line
    inputMin: 50,
    // eslint-disable-next-line
    currentMax: 950,
    // eslint-disable-next-line
    inputMax: 950,
  };
  componentDidMount() {
    const { currentMin, currentMax, max } = this.state;

    this.minValue.style.width = (currentMin * 100) / max + "%";
    this.maxValue.style.width = (currentMax * 100) / max + "%";

    this.setState({
      sliderWidth: this.slider.offsetWidth,
      offsetSliderWidht: this.slider.offsetLeft,
    });
  }
  setMin = (e) => {
    const { min, max, currentMax, minValueBetween } = this.state;
    const inputMin = e.target.value;

    this.setState({
      inputMin,
    });

    if (inputMin >= min && inputMin <= currentMax - minValueBetween) {
      this.setState({
        currentMin: parseInt(inputMin),
      });
      this.minValue.style.width = (inputMin * 100) / max + "%";
    }
  };

  changeMinValue = (e) => {
    e.preventDefault();

    document.addEventListener("mousemove", this.onMouseMoveMin);
    document.addEventListener("mouseup", this.onMouseUpMin);

    document.addEventListener("touchmove", this.onMouseMoveMin);
    document.addEventListener("touchend", this.onMouseUpMin);
  };

  onMouseMoveMin = (e) => {
    const {
      min,
      max,
      currentMax,
      minValueBetween,
      sliderWidth,
      offsetSliderWidht,
    } = this.state;

    const dragedWidht = e.clientX - offsetSliderWidht;
    const dragedWidhtInPercent = (dragedWidht * 100) / sliderWidth;
    const currentMin = Math.abs(parseInt((max * dragedWidhtInPercent) / 100));

    // console.log(e.pageX, e.clientX, offsetSliderWidht);

    // console.log(currentMin , (currentMax));

    // console.log((max * dragedWidhtInPercent)/100);

    if (currentMin >= min && currentMin <= currentMax - minValueBetween) {
      this.minValue.style.width = dragedWidhtInPercent + "%";
      this.minValue.dataset.content = currentMin;

      this.setState({
        currentMin,
        inputMin: currentMin,
      });
    }
  };

  onMouseUpMin = () => {
    const { currentMin, currentMax } = this.state;

    console.log(currentMin, currentMax);

    document.removeEventListener("mouseup", this.onMouseUpMin);
    document.removeEventListener("mousemove", this.onMouseMoveMin);

    document.removeEventListener("touchend", this.onMouseMoveMin);
    document.removeEventListener("touchmove", this.onMouseUpMin);
  };

  setMax = (e) => {
    const { max, currentMin, minValueBetween } = this.state;

    const inputMax = e.target.value;

    this.setState({
      inputMax,
    });

    if (inputMax >= currentMin + minValueBetween && inputMax <= max) {
      this.setState({
        currentMax: parseInt(inputMax),
      });
      this.maxValue.style.width = (inputMax * 100) / max + "%";
    }
  };

  changeMaxValue = (e) => {
    e.preventDefault();

    document.addEventListener("mousemove", this.onMouseMoveMax);
    document.addEventListener("mouseup", this.onMouseUpMax);

    document.addEventListener("touchmove", this.onMouseMoveMax);
    document.addEventListener("touchend", this.onMouseUpMax);
  };

  onMouseMoveMax = (e) => {
    const {
      max,
      currentMin,
      minValueBetween,
      sliderWidth,
      offsetSliderWidht,
    } = this.state;
    const maxWalueThumb = this.maxValue;
    const dragedWidht = e.clientX - offsetSliderWidht;
    const dragedWidhtInPercent = (dragedWidht * 100) / sliderWidth;
    const currentMax = Math.abs(parseInt((max * dragedWidhtInPercent) / 100));

    if (currentMax >= currentMin + minValueBetween && currentMax <= max) {
      maxWalueThumb.style.width = dragedWidhtInPercent + "%";
      maxWalueThumb.dataset.content = currentMax;
      this.setState({
        currentMax,
        inputMax: currentMax,
      });
    }
  };

  onMouseUpMax = () => {
    document.removeEventListener("mouseup", this.onMouseUp);
    document.removeEventListener("mousemove", this.onMouseMoveMax);

    document.removeEventListener("touchend", this.onMouseUp);
    document.removeEventListener("touchmove", this.onMouseMoveMax);
  };

  maxForMin = () => {
    const { currentMax, minValueBetween } = this.state;
    return currentMax - minValueBetween;
  };

  minForMax = () => {
    const { currentMin, minValueBetween } = this.state;
    return currentMin + minValueBetween;
  };
  priceFilterHandler = (e) => {
    const { currentMin, currentMax } = this.state;
    this.props.filterPriceHandler(e, currentMin, currentMax);
  };
  render() {
    const { min, max, currentMin, inputMin, currentMax, inputMax } = this.state;

    return (
      <div className="card-slider">
        <div className="values">
          <div>min: {min}</div>
          <div>max: {max}</div>
        </div>

        <div ref={(ref) => (this.slider = ref)} id="slider">
          <div
            ref={(ref) => (this.minValue = ref)}
            id="min"
            data-content={currentMin}
          >
            <div
              ref={(ref) => (this.minValueDrag = ref)}
              id="min-drag"
              onMouseDown={this.changeMinValue}
              onTouchStart={this.changeMinValue}
              onMouseUp={(e) =>
                this.props.filterPriceHandler(e, currentMin, currentMax)
              }
            ></div>
          </div>

          <div
            ref={(ref) => (this.maxValue = ref)}
            id="max"
            data-content={currentMax}
          >
            <div
              ref={(ref) => (this.maxValueDrag = ref)}
              id="max-drag"
              onMouseDown={this.changeMaxValue}
              onTouchStart={this.changeMaxValue}
              onMouseUp={(e) =>
                this.props.filterPriceHandler(e, currentMin, currentMax)
              }
            ></div>
          </div>
        </div>

        <div className="current-value d-flex justify-content-between">
          <input
            className="text-center button-sidenav"
            id="min-input"
            type="number"
            step="5"
            onChange={this.setMin}
            onBlur={this.priceFilterHandler}
            value={inputMin}
            min={min}
            max={this.maxForMin}
          />
          <br />
          <input
            className="text-center button-sidenav"
            id="max-input"
            type="number"
            step="5"
            onChange={this.setMax}
            value={inputMax}
            onBlur={this.priceFilterHandler}
            min={this.minForMax}
            max={max}
          />
        </div>
        <button
          onClick={this.priceFilterHandler}
          type="button"
          className="float-right btn btn-primary price-filter-sub"
        >
          Submit
        </button>
      </div>
    );
  }
}

export default RangeSlider;
