/*
  # Create payments table

  1. New Tables
    - `payments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `amount` (decimal)
      - `currency` (text)
      - `method` (text - paystack or paypal)
      - `transaction_id` (text, unique)
      - `status` (text - pending, completed, failed)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `payments` table
    - Add policy for users to read their own payments
    - Add policy for admins to read all payments
*/

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'USD' NOT NULL,
  method text CHECK (method IN ('paystack', 'paypal')) NOT NULL,
  transaction_id text UNIQUE NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Users can read their own payments
CREATE POLICY "Users can read own payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Admins can read all payments
CREATE POLICY "Admins can read all payments"
  ON payments
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Service role can insert payments
CREATE POLICY "Service can insert payments"
  ON payments
  FOR INSERT
  TO service_role
  WITH CHECK (true);