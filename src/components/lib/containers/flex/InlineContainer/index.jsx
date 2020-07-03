import React from 'react';
import './style.css';


/**
 * Trys to keep elements Inline. 
 * Specify a breakPoint to collapse inline elements to a vertical list
 * 
 * @param {Object}  props 
 * @param {Element} props.children  - Elements this container wraps
 * @param {String}  [props.gap='0px']       - Horizontal gap between elements
 * @param {String}  [props.minWidth='0px']  - Breakpoint Width to convert to vertical list  
 */
const InlineContainer = ({ children, gap, minWidth }) => {
    //If not specified sets a default value
    gap = !gap ? '0px' : gap ;
    minWidth = !minWidth ? '0px' : minWidth ;

    const length = children.length;

    const css = {
        gridTemplateColumns: `repeat(auto-fill, minmax( min(max(${minWidth}, calc(${100/length}% - ${gap})),100%), 1fr))`,
        gap: gap,
    }

    return (
        <div className='inlineContainer' style={css}>
            {children}
        </div>
    )
}

export default InlineContainer;