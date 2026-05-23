<?php

session_start();

require_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['register_btn'])) {

    extract($_POST);

    $errors = [];

    //name validates:
    if (empty($full_name)) {
        $errors['full_name'] = "Please enter your name.";
    } elseif (strlen($full_name) < 3) {
        $errors['full_name'] = "Name must be at least 3 characters.";
    } elseif (!preg_match("/^[a-zA-Z\s]+$/", $full_name)) {
        $errors['full_name'] = "Name must contain letters and spaces only.";
    }

    //email validates:
    if (empty($email)) {
        $errors['email'] = "Please enter your email address.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Please enter a valid email address.";
    } else {
        $check_email = "SELECT id FROM users WHERE email = '$email' LIMIT 1";
        $result = mysqli_query($connection, $check_email);

        if (mysqli_num_rows($result) > 0) {
            $errors['email'] = "This email is already registered.";
        }
    }

    //phone validates:
    if (empty($phone)) {
        $errors['phone'] = "Please enter your phone number.";
    } elseif (!preg_match("/^01[0125][0-9]{8}$/", $phone)) {
        $errors['phone'] = "Please enter a valid Egyptian phone number (e.g., 01xxxxxxxxx).";
    }

    //password validates:
    if (empty($password)) {
        $errors['password'] = "Please enter a password.";
    } elseif (strlen($password) < 8) {
        $errors['password'] = "Password must be at least 8 characters long.";
    }
    if (empty($confirm_password)) {
        $errors['confirm_password'] = "Please confirm your password.";
    } elseif ($password !== $confirm_password) {
        $errors['confirm_password'] = "Passwords do not match!";
    }

    //job profile validates:
    $allowed_profiles = ['frontend', 'backend'];
    if (empty($job_profile)) {
        $errors['job_profile'] = "Please select your job profile.";
    } elseif (!in_array($job_profile, $allowed_profiles)) {
        $errors['job_profile'] = "Invalid job profile selected.";
    }

    if (empty($errors)) {
        $password = password_hash($password, PASSWORD_DEFAULT);
        $query = "INSERT INTO `users`
        ( `full_name`, `email`, `phone_number`, `password`, `job_profile`)
        VALUES 
        ('$full_name','$email','$phone','$password','$job_profile')";

        $run = mysqli_query($connection, $query);
        if ($run) {
            $_SESSION['success'] = "Your registration has been successful!";
            header("location:register.php");
            exit();
        }
    } else {
        $_SESSION['errors'] = $errors;
        header("location:register.php");
        exit();
    }
} else {
    header("location:register.php");
}
