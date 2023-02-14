import { FormOptionsDto } from "@/interfaces/formOptionsDto.interface"
import UserInfoDto from "@/interfaces/userInfoDto.interfaces"
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react"

const Form = ({ formOptions, setUserCreated}: {formOptions: FormOptionsDto, setUserCreated: Dispatch<SetStateAction<boolean>>}) => {
  const {occupations, states} = formOptions;
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const occupationSelectRef = useRef<HTMLSelectElement>(null);
  const stateSelectRef = useRef<HTMLSelectElement>(null);

  const [canSubmit, setCanSubmit] = useState(false)

  const validateForm = () => {
    if (nameInputRef.current?.value &&
        emailInputRef.current?.value &&
        passwordInputRef.current?.value &&
        occupationSelectRef.current?.value &&
        stateSelectRef.current?.value
        ) {
          setCanSubmit(true)
    } else {
      setCanSubmit(false)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const userInfo: UserInfoDto = Object.fromEntries(data)
    const JSONdata = JSON.stringify(userInfo)
    const endpoint = 'https://frontend-take-home.fetchrewards.com/form'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)
    const result = await response.json()
    if (response.ok) {
      console.log('calling set user created ')
      setUserCreated(true)
    }
  }

  return (
    <form id="user-form"
      onSubmit={handleSubmit}
      >
      <label htmlFor="name" className="sm:mt-1">
        Full Name
        <input required
          type="text"
          id="name"
          name="name"
          placeholder="Full Name"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
          ref={nameInputRef}
          onChange={validateForm} />
      </label>

      <label htmlFor="email">
        Email
        <input required
        type="text" 
        id="email"
        name="email"
        placeholder="example@example.com"
        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        ref={emailInputRef}
        onChange={validateForm} />
      </label>

      <label htmlFor="password">
        Password
        <input required
        type="password" 
        id="password"
        name="password"
        placeholder=""
        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        ref={passwordInputRef}
        onChange={validateForm} />
      </label>

      <label htmlFor="occupation">
        Occupation
        <select
          required
          id="occupation"
          name="occupation"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          ref={occupationSelectRef}
          onChange={validateForm}
        >
          <option />
            {occupations ? occupations.map((occupation: string) => (
            <option key={occupation} value={occupation}>
              {occupation}
            </option>
          )) : null } 
        </select>
      </label>

      <label htmlFor="state">
        State
        <select
        required
        disabled={!states || !states.length}
        id="state"
        name="state"
        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        ref={stateSelectRef}
        onChange={validateForm}>
          <option />
          {states ? states.map((state) => (
            <option key={state.name} value={state.abbreviation}>
              {state.abbreviation}
            </option>
          )) : null}
        </select>
      </label>
      <button disabled={!canSubmit} className=" mt-3 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 bg-gradient-to-r from-yellow-400 to-orange-400 disabled:cursor-not-allowed">
        Submit
      </button>
    </form>
  )
}

export default Form;