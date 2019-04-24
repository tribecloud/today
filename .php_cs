<?php

$excluded_folders = [
    'bootstrap/cache',
    'node_modules',
    'storage',
    'public/docs',
    'vendor'
];
$finder = PhpCsFixer\Finder::create()
    ->exclude($excluded_folders)
    ->in(__DIR__);
;
return PhpCsFixer\Config::create()
    ->setRules(array(
        '@Symfony' => true,
        'binary_operator_spaces' => ['align_double_arrow' => true],
        'array_syntax' => ['syntax' => 'short'],
        'array_indentation' => true,
        'linebreak_after_opening_tag' => true,
        'not_operator_with_successor_space' => true,
        'ordered_imports' => true,
        'phpdoc_order' => true,
        'phpdoc_no_empty_return' => false,
        'phpdoc_no_package' => false,
    ))
    ->setFinder($finder)
;
