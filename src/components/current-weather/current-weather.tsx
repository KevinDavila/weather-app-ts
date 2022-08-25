import "./current-weather.css";
type dataType={
    data: any;
}
//initialized function
const CurrentWeather = ({data}: dataType) => {
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data.name}</p>
          <p className="description"></p>
          <img alt="weather" className="icon" src="sunny" />
        </div>
      </div>
      <div className="bottom">
        <p className="temperature">°C</p>
        <div className="details">
            <div className="parameter-row">
                <span className="parameter-label">example</span>
                <span className="parameter-value">18°C</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
