"use client"

import React from "react"

const labelBaseClasses = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className = "", ...props }, ref) => {
  const combinedClassName = `${labelBaseClasses} ${className}`.trim()

  return (
    <label
      ref={ref}
      className={combinedClassName}
      {...props}
    />
  )
})

Label.displayName = "Label"

export { Label }