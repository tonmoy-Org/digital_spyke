declare module '*.png' {
  const content: string | import('next/dist/client/image-component').StaticImageData;
  export default content;
}

declare module '*.jpg' {
  const content: string | import('next/dist/client/image-component').StaticImageData;
  export default content;
}

declare module '*.jpeg' {
  const content: string | import('next/dist/client/image-component').StaticImageData;
  export default content;
}

declare module '*.svg' {
  const content: string | import('next/dist/client/image-component').StaticImageData;
  export default content;
}

declare module '*.webp' {
  const content: string | import('next/dist/client/image-component').StaticImageData;
  export default content;
}
