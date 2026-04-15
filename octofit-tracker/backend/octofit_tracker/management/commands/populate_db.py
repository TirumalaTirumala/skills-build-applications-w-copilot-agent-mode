from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Connect to MongoDB directly for index creation
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']

        # Drop collections if they exist
        db.users.drop()
        db.teams.drop()
        db.activities.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Create unique index on email for users
        db.users.create_index([('email', 1)], unique=True)

        # Sample data
        users = [
            {'name': 'Clark Kent', 'email': 'superman@dc.com', 'team': 'dc'},
            {'name': 'Bruce Wayne', 'email': 'batman@dc.com', 'team': 'dc'},
            {'name': 'Diana Prince', 'email': 'wonderwoman@dc.com', 'team': 'dc'},
            {'name': 'Tony Stark', 'email': 'ironman@marvel.com', 'team': 'marvel'},
            {'name': 'Steve Rogers', 'email': 'captain@marvel.com', 'team': 'marvel'},
            {'name': 'Natasha Romanoff', 'email': 'blackwidow@marvel.com', 'team': 'marvel'},
        ]
        db.users.insert_many(users)

        teams = [
            {'name': 'marvel', 'members': ['Tony Stark', 'Steve Rogers', 'Natasha Romanoff']},
            {'name': 'dc', 'members': ['Clark Kent', 'Bruce Wayne', 'Diana Prince']},
        ]
        db.teams.insert_many(teams)

        activities = [
            {'user': 'Clark Kent', 'activity': 'Flight', 'duration': 60},
            {'user': 'Tony Stark', 'activity': 'Suit Training', 'duration': 45},
        ]
        db.activities.insert_many(activities)

        leaderboard = [
            {'team': 'marvel', 'points': 150},
            {'team': 'dc', 'points': 120},
        ]
        db.leaderboard.insert_many(leaderboard)

        workouts = [
            {'user': 'Steve Rogers', 'workout': 'Shield Throw', 'reps': 30},
            {'user': 'Diana Prince', 'workout': 'Lasso Practice', 'reps': 25},
        ]
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
