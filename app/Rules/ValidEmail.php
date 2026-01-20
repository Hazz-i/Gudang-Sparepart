<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidEmail implements ValidationRule
{
    /**
     * Run the validation rule.
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Check if email format is valid
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            $fail('Format email tidak valid.');
            return;
        }

        // Extract domain from email
        $domain = substr(strrchr($value, "@"), 1);

        // Check if domain has valid MX records
        if (!checkdnsrr($domain, 'MX') && !checkdnsrr($domain, 'A')) {
            $fail('Email tidak valid. Domain email tidak terdaftar atau tidak memiliki server email.');
            return;
        }

        // List of common disposable/temporary email domains to block
        $disposableDomains = [
            'mailinator.com',
            'guerrillamail.com',
            'temp-mail.org',
            'throwaway.email',
            '10minutemail.com',
            'tempmail.com',
            'fakeinbox.com',
            'trashmail.com',
            'yopmail.com',
            'maildrop.cc',
        ];

        if (in_array(strtolower($domain), $disposableDomains)) {
            $fail('Email temporary/disposable tidak diperbolehkan. Gunakan email asli Anda.');
            return;
        }

        // Additional check: Ensure domain has at least one dot (e.g., gmail.com)
        if (substr_count($domain, '.') < 1) {
            $fail('Domain email tidak valid.');
            return;
        }
    }
}
