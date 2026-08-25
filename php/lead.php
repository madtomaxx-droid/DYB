<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['success' => false, 'message' => 'Разрешён только POST-запрос.']); exit; }
// TODO: enforce HTTPS at web-server level; add CSRF protection and rate limiting before launch.
function input(string $key): string { return trim((string)($_POST[$key] ?? '')); }
if (input('website') !== '') { http_response_code(422); echo json_encode(['success' => false, 'message' => 'Не удалось обработать заявку.']); exit; }
$name = input('name'); $phone = input('phone'); $comment = input('comment'); $consent = filter_var($_POST['consent'] ?? false, FILTER_VALIDATE_BOOLEAN);
if (mb_strlen($name) < 2 || mb_strlen($name) > 120 || mb_strlen($phone) < 5 || mb_strlen($phone) > 40 || mb_strlen($comment) > 3000 || !$consent) { http_response_code(422); echo json_encode(['success' => false, 'message' => 'Проверьте имя, телефон и согласие на обработку данных.']); exit; }
// TODO: map validated fields and send them to amoCRM API from this server endpoint. Never expose credentials to frontend files.
echo json_encode(['success' => true, 'message' => 'Заявка принята.']);
