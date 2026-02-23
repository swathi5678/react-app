import csv
import json
from pathlib import Path

INPUT_FILE = Path('data/products.csv')
OUTPUT_FILE = Path('src/data/products.json')

RELEVANT_COLUMNS = [
    'product_title',
    'product_rating',
    'total_reviews',
    'purchased_last_month',
    'discounted_price',
    'original_price',
    'discount_percentage',
    'is_best_seller',
    'is_sponsored',
    'has_coupon',
    'buy_box_availability',
    'delivery_date',
    'sustainability_tags',
    'data_collected_at',
    'product_category'
]


def to_bool(value: str) -> bool:
    return str(value).strip().lower() in {'true', '1', 'yes'}


def parse_number(value: str):
    clean = str(value).replace(',', '').strip()
    if clean == '':
        return 0
    if '.' in clean:
        return float(clean)
    return int(clean)


with INPUT_FILE.open(newline='', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = []
    for row in reader:
        item = {k: row.get(k, '') for k in RELEVANT_COLUMNS}
        item['product_rating'] = float(item['product_rating'] or 0)
        item['total_reviews'] = int(parse_number(item['total_reviews']))
        item['purchased_last_month'] = int(parse_number(item['purchased_last_month']))
        item['discounted_price'] = float(parse_number(item['discounted_price']))
        item['original_price'] = float(parse_number(item['original_price']))
        item['discount_percentage'] = float(parse_number(item['discount_percentage']))
        item['is_best_seller'] = to_bool(item['is_best_seller'])
        item['is_sponsored'] = to_bool(item['is_sponsored'])
        item['has_coupon'] = to_bool(item['has_coupon'])
        item['buy_box_availability'] = to_bool(item['buy_box_availability'])
        rows.append(item)

OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
with OUTPUT_FILE.open('w', encoding='utf-8') as f:
    json.dump(rows, f, indent=2)

print(f'Converted {len(rows)} products to {OUTPUT_FILE}')
