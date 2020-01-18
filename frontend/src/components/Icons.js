import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faMinus } from '@fortawesome/free-solid-svg-icons';

export function ViewIcon() {
    return (
        <FontAwesomeIcon icon={faEye} />
    );
}

export function EditIcon() {
    return (
        <FontAwesomeIcon icon={faEdit} />
    );
}

export function DeleteIcon() {
    return (
        <FontAwesomeIcon icon={faMinus} />
    );
}