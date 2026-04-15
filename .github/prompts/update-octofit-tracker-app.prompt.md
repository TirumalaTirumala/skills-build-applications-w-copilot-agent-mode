mode: 'agent'
model: GPT-4.1

# App Updates

- Go project files are in the `octofit-tracker/backend/octofit_tracker` directory.
- Update `settings.py` for MongoDB connection and CORS.
- Update `models.py`, `serializers.py`, `urls.py`, `views.py`, `tests.py`, and `admin.py` to support users, teams, activities, leaderboard, and workouts collections.
- Ensure `/` points to the API and `api_root` is present in `urls.py`.
