import Button from "@/components/elements/Button";
import CheckBox from "@/components/elements/CheckBox";
import Input from "@/components/elements/Input";
import Radio from "@/components/elements/Radio";
import Toggle from "@/components/elements/Toggle";
import { useState } from "react";

const Form = () => {
  const t = new Date();
  const [date, setDate] = useState(`${t.getHours()}:${t.getMinutes()}`);
  const [radio, setRadio] = useState("");
  const handleChange = (e) => {
    console.log(e.target.checked)
  }

  const handleRadioChange = (e) => {
    setRadio(e.target.value)
    console.log(e.target.value);
  }

  const onSubmitHandle = (e) => {
    e.preventDefault()
    console.log(e.target.checked)
  }
  return (
    <div className="w-screen h-screen">
      <div className="dark:bg-black">
        <div className="w-full sm:w-72 py-3 m-auto">
          {/* <Input label="Select Time" value={date} onChange={handleChange} type="time" /> */}
          <CheckBox label="Check this box to add price" color="blue" size="sm" />
          <CheckBox label="Check this box to add price" color="blue" size="md" />
          <CheckBox label="Check this box to add price" color="blue" size="lg" />
          <CheckBox label="Check this box to add price" color="blue" size="sm" />
          <CheckBox label="Check this box to add price" color="blue" size="md" />
          <CheckBox label="Check this box to add price" color="blue" size="lg" />
          <CheckBox label="Check this box to add price" color="blue" checkSide="right" size="sm" />
          <CheckBox label="Check this box to add price" color="blue" checkSide="right" size="md" />
          <CheckBox label="Check this box to add price" color="blue" checkSide="right" size="lg" />
          <CheckBox label="Check this box to add price" color="blue" checkSide="right" size="sm" />
          <CheckBox label="Check this box to add price" color="blue" checkSide="right" size="md" />
          <CheckBox label="Check this box to add price" color="blue" checkSide="right" size="lg" />
          <Button onClick={() => console.log(date)} label="Hello" size="sm" />

          <form onSubmit={onSubmitHandle}>
            <Radio value={radio} onChange={handleRadioChange} color="blue" size="md" />

            <Button type="submit" label="SUbmit" />
          </form>
          <Toggle onChange={() => console.log('sdlksjdkl')} leftLabel="Loght" rightLabel="Dark" />
        </div>
      </div>
    </div>
  )
}

export default Form;