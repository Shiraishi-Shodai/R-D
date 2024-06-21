import React from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const baseInputClasses = `
  flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm 
  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 
  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
`

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type, ...props }, ref) => {
    const combinedClassName = `${baseInputClasses} ${className}`.trim()

    return (
      <input
        type={type}
        className={combinedClassName}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }