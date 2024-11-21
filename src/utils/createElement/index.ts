type Children =
  | string
  | number
  | null
  | undefined
  | HTMLElement
  | HTMLElementTagNameMap[keyof HTMLElementTagNameMap]
  | Node

type ClassName = string | null | undefined

type CustomElement<Tag extends keyof HTMLElementTagNameMap> = Partial<
  Omit<HTMLElementTagNameMap[Tag], 'children' | 'className'> & {
    className?: ClassName | ClassName[] | ClassName[][]
  }
>

type InternalCustomElement<Tag extends keyof HTMLElementTagNameMap> = Partial<
  Omit<HTMLElementTagNameMap[Tag], 'children' | 'className'> & {
    className?: CustomElement<Tag>['className'] | CustomElement<Tag>['className'][]
  }
> | null

type GenericElement = CustomElement<keyof HTMLElementTagNameMap>

const addClassName = (element: HTMLElement, className: GenericElement['className']) => {
  if (!className) return
  if (Array.isArray(className)) return element.classList.add(...(className.flat(4).filter(Boolean) as string[]))
  element.classList.add(className)
}

const addChildren = (element: HTMLElement, children: Children | Children[]) => {
  if (Array.isArray(children))
    return children.forEach((child) => {
      if (typeof child === 'string' || typeof child === 'number')
        return element.appendChild(document.createTextNode(child.toString()))

      if (child) return element.appendChild(child)
    })

  if (typeof children === 'string' || typeof children === 'number')
    return element.appendChild(document.createTextNode(children.toString()))

  if (children) return element.appendChild(children)
}

export const createElement = <Tag extends keyof HTMLElementTagNameMap>(
  tag: Tag,
  props?: InternalCustomElement<Tag>,
  ...children: Children[]
) => {
  const element = document.createElement(tag)

  if (props)
    Object.entries(props).forEach(([key, value]) => {
      if (value === undefined || value === null) return
      const normalizedKey = key.toLowerCase()

      if (normalizedKey === 'classname') return addClassName(element, value as string | string[])
      if (normalizedKey === 'htmlfor') return element.setAttribute('for', value)
      if (normalizedKey === 'textcontent') return (element.textContent = value)
      if (normalizedKey === 'onclick') return element.addEventListener('click', value)
      if (normalizedKey === 'oninput') return element.addEventListener('input', value)
      if (typeof value === 'string') return element.setAttribute(key, value)
      if (typeof value === 'number') return element.setAttribute(key, String(value))
      if (typeof value === 'boolean') return element.setAttribute(key, String(value))
    })

  if (children) addChildren(element, children)

  return element
}
