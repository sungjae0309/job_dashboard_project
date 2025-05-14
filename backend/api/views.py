from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Mentor
import random
from rest_framework.generics import ListAPIView
from .models import JobPost
from .MentorSerializer import JobPostSerializer

class JobPostListView(ListAPIView):
    queryset = JobPost.objects.all()
    serializer_class = JobPostSerializer


# 평균 학점, 평균 나이 구하는 summary API
@api_view(['GET'])
def summary(request):
    users = User.objects.all()
    avg_gpa = round(sum(user.gpa for user in users) / len(users), 2)
    avg_age = round(sum(user.age for user in users) / len(users), 1)

    return Response({
        "average_gpa": avg_gpa,
        "average_age": avg_age,
    })

# 랜덤 멘토 1명 가져오는 random_mentor API
@api_view(['GET'])
def random_mentor(request):
    mentors = list(Mentor.objects.all())
    if not mentors:
        return Response({"message": "멘토가 없습니다."}, status=404)
    mentor = random.choice(mentors)
    return Response({
        "school": mentor.school,
        "major": mentor.major,
        "job": mentor.job,
    })