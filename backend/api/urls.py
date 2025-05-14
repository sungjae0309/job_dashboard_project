from django.urls import path
from .views import summary, random_mentor
from .views import JobPostListView


urlpatterns = [
    path('summary/', summary),
    path('random-mentor/', random_mentor),
    path("jobs/", JobPostListView.as_view(), name="jobpost-list"),
]