export function Label({ children }) { return <label className="label">{children}</label>; }
export function Input(props) { return <input {...props} className={"input " + (props.className||"")} />; }
export function Textarea(props) { return <textarea {...props} className={"input min-h-[120px] " + (props.className||"")} />; }
export function Button({ children, ...props }) { return <button {...props} className={"btn " + (props.className||"")}>{children}</button>; }