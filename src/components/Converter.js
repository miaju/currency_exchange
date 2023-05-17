import ShowConvert from "./ShowConvert";
import Input from "./Input";
import useApplicationData from "../hooks/useApplicationData";
import "./Converter.scss";

//Renders the input form and conditionally renders error message and result card
export default function Converter(props) {
  const { state, findData } = useApplicationData();

  return (
    <div id="con">
      {state.errMes && <div id="err">{state.errMes}</div>}
      <Input findData={findData} countries={state.countries}/>
      <br/>
      {state.conversion && <ShowConvert amount={state.amount} conversion={state.conversion} to={state.to} from={state.from} rate={state.rate}/>}
    </div>
  )

};