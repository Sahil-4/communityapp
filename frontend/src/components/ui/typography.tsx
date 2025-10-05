import { cn } from "@/lib/utils";
import React from "react";

export function TypographyH1({
  children,
  className,
  ...props
}: React.PropsWithChildren & React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
        className,
      )}
      {...props}>
      {children}
    </h1>
  );
}

export function TypographyH2({
  children,
  className,
  ...props
}: React.PropsWithChildren & React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}>
      {children}
    </h2>
  );
}

export function TypographyH3({
  children,
  className,
  ...props
}: React.PropsWithChildren & React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
      {...props}>
      {children}
    </h3>
  );
}

export function TypographyH4({
  children,
  className,
  ...props
}: React.PropsWithChildren & React.ComponentProps<"h4">) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}>
      {children}
    </h4>
  );
}

export function TypographyP({
  children,
  className,
  ...props
}: React.PropsWithChildren & React.ComponentProps<"p">) {
  return (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}>
      {children}
    </p>
  );
}

export function TypographyMuted({
  children,
  className,
  ...props
}: React.PropsWithChildren & React.ComponentProps<"p">) {
  return (
    <p className={cn("text-muted-foreground text-sm", className)} {...props}>
      {children}
    </p>
  );
}

export function TypographyList({
  children,
  className,
  ...props
}: React.PropsWithChildren & React.ComponentProps<"ul">) {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props}>
      {children}
    </ul>
  );
}
