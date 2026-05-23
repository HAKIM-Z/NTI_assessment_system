<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - NTI Capacity Building Program</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/style.css">
</head>

<body>
    <div class="auth-container">
        <div class="auth-card fade-in">
            <div class="auth-header">
                <div class="auth-logo">NTI</div>
                <div class="brand-text" style="align-items: center;">
                    <span class="brand-title">Capacity Building</span>
                    <span class="brand-subtitle">Program</span>
                </div>
                <h1 class="auth-title mt-3">Create Account</h1>
                <p class="auth-subtitle">Join the NTI assessment program</p>
            </div>

            <form id="register-form" action="register.php" method="post">
                <div class="form-group">
                    <label class="form-label">Full Name</label>
                    <input type="text" name="full_name" class="form-control" id="fullName" placeholder="Enter your full name" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Email Address</label>
                    <input type="email" name="email" class="form-control" id="email" placeholder="Enter your email" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Phone Number</label>
                    <input type="tel" name="phone" class="form-control" id="phone" placeholder="Enter your phone number">
                </div>

                <div class="form-group">
                    <label class="form-label">Password</label>
                    <input type="password" name="password" class="form-control" id="password" placeholder="Create a password" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Confirm Password</label>
                    <input type="password" name="confirm_password" class="form-control" id="confirmPassword" placeholder="Confirm your password" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Job Profile</label>
                    <select class="form-control" id="jobProfile" name="job_profile">
                        <option value="">Select your job profile</option>
                        <option value="frontend">Front-End Developer</option>
                        <option value="backend">Back-End Developer</option>
                    </select>
                </div>

                <button type="submit" name="register_btn" class="btn btn-primary w-100">Create Account</button>
            </form>

            <div class="auth-footer">
                Already have an account? <a href="../index.html">Sign in here</a>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal-overlay" id="modal">
        <div class="modal-content">
            <div class="modal-icon" id="modal-icon">ℹ️</div>
            <div class="modal-title" id="modal-title">Title</div>
            <div class="modal-text" id="modal-text">Message</div>
            <div class="modal-buttons" id="modal-buttons"></div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../assets/js/main.js"></script>
    <script>
        document.getElementById('register-form').addEventListener('submit', function(e) {
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                e.preventDefault();
                showModal('Error', 'Passwords do not match!', '❌');
                return;
            }

        });
    </script>
</body>

</html>