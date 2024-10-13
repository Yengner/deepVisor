-- Step 1: Add the email column and foreign key constraint to link public.users to auth.users
ALTER TABLE public.users
ADD COLUMN email text NOT NULL;

ALTER TABLE public.users
ADD CONSTRAINT fk_users_auth_users FOREIGN KEY(id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Step 2: Create Function to validate email uniqueness before insert/update
CREATE OR REPLACE FUNCTION public.validate_email_before_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER 
AS $$
BEGIN
    -- Check if this is an INSERT or UPDATE operation
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        -- Ensure email is present
        IF NEW.raw_user_meta_data->>'email' IS NULL OR NEW.raw_user_meta_data->>'email' = '' THEN
            RAISE EXCEPTION 'Email is required';
        END IF;

        -- Check if the email already exists in public.users
        IF EXISTS(SELECT 1 FROM public.users WHERE email = NEW.raw_user_meta_data->>'email' AND id != NEW.id) THEN
            RAISE EXCEPTION 'This email is already in use';
        END IF;
    END IF;

    -- Continue with the operation if no conflicts
    RETURN NEW;
END;
$$;

-- Step 3: Create Triggers to validate email uniqueness before insert/update
CREATE TRIGGER validate_email_insert_trigger
    BEFORE INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.validate_email_before_change();

CREATE TRIGGER validate_email_update_trigger
    BEFORE UPDATE ON auth.users
    FOR EACH ROW
    WHEN (OLD.raw_user_meta_data->>'email' IS DISTINCT FROM NEW.raw_user_meta_data->>'email')
    EXECUTE FUNCTION public.validate_email_before_change();

-- Step 4: Create Function to update email in public.users if auth.users email changes
CREATE OR REPLACE FUNCTION public.update_email()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    SECURITY DEFINER 
    AS $$
    BEGIN
        UPDATE public.users 
        SET email = NEW.raw_user_meta_data->>'email'
        WHERE id = NEW.id;
        
        RETURN NEW;
    END;
$$;

-- Step 5: Trigger to handle updates to email in auth.users
CREATE TRIGGER on_auth_user_updated
    AFTER UPDATE ON auth.users
    FOR EACH ROW
    WHEN (OLD.raw_user_meta_data->>'email' IS DISTINCT FROM NEW.raw_user_meta_data->>'email')
    EXECUTE FUNCTION public.update_email();

-- Step 6: Create Function to insert a new user into public.users when a user is created in auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    SECURITY DEFINER 
    AS $$
    BEGIN
        -- Insert new user into public.users with data from auth.users
        INSERT INTO public.users(id, first_name, last_name, email, business_name, phone_number, created_at, updated_at)
        VALUES(NEW.id, 
               NEW.raw_user_meta_data->>'first_name', 
               NEW.raw_user_meta_data->>'last_name', 
               NEW.raw_user_meta_data->>'email', 
               NEW.raw_user_meta_data->>'business_name', 
               NEW.raw_user_meta_data->>'phone_number', 
               NEW.created_at, 
               NEW.updated_at);

        RETURN NEW;
    END;
$$;

-- Step 7: Trigger to handle new user creation in auth.users
CREATE TRIGGER handle_new_user_trigger
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();
