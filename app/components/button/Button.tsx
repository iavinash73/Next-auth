'use client'
import { cn } from "@/app/utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef } from "react";
interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const buttonVariants = cva("inline-flex items-center rounded-md text-[24px]", {
  variants: {
    variant: {
      default: "border-[1px] border-black text-[16px] hover:bg-[#e7a6e7] hover:border-black hover:text-black duration-[300ms]",
      black: "flex items-center justify-center border-[1.5px] border-black text-white bg-black text-[16px] hover:bg-[#e7a6e7] hover:border-black hover:text-black duration-[300ms] disabled:bg-slate-400 disabled:text-black disabled:hover:cursor-not-allowed",
      active:"border-[1px] border-black text-white bg-black text-[16px] hover:bg-black  hover:text-white duration-[300ms]",
    },
    size: {
      default: "h-[35px] px-3 py-1 rounded-md",
      sm: "px-4 rounded-md",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export { Button, buttonVariants };
