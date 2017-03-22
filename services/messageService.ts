import { Notify } from '../vendor/beyond';

const position = 'top-right', timeout = 5000;

export function info(message) {
    Notify(message, position, timeout, 'info', 'fa-envelope', true);
}

export function success(message) {
    Notify(message, position, timeout, 'success', 'fa-check', true);
}

export function error(message) {
    Notify(message, position, timeout, 'danger', 'fa-bolt', true);
}

export function warning(message) {
    Notify(message, position, timeout, 'warning', 'fa-warning', true);
}