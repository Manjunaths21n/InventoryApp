
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { IDroppbleProps } from './types';

export function Droppable(props: IDroppbleProps) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    });
    const style = {
        opacity: isOver ? 1 : 0.5,
    };

    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}
