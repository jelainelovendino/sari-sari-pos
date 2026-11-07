ALTER TABLE sales
  ADD COLUMN IF NOT EXISTS order_type TEXT NOT NULL DEFAULT 'dine_in'
    CHECK (order_type IN ('dine_in', 'take_out'));

ALTER TABLE sales
  ADD COLUMN IF NOT EXISTS queue_no INTEGER;
