import { cloneElement, Children } from 'react'

/**
 * Deeply attaches a function to all children in the container.
 * This function lifts up state of all elements to the container
 * @param {Array<Element>} elements - container elements
 */
const liftUpAll = (children,handleliftup) => {
   return Children.toArray(children).map(child => {
        const { props:{ children } } = child;

        if (Array.isArray(children)) {
            return cloneElement(child, { handleliftup:handleliftup },...liftUpAll(children, handleliftup))

        } else if (typeof(child.type) !== 'string'){
            return cloneElement(child,{ handleliftup:handleliftup })
        }

        return child
    })
}

export default liftUpAll ;