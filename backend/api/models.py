from django.db import models

class User(models.Model): 
    name = models.CharField(max_length=100) 
    gpa = models.FloatField()
    age = models.IntegerField()

    def __str__(self):
        return self.name
    
class Mentor(models.Model): 
    name = models.CharField(max_length=100)
    school = models.CharField(max_length=100)
    major = models.CharField(max_length=100)
    job = models.CharField(max_length=100)

    def __str__(self):
        return self.school + " - " + self.major
    
class JobPost(models.Model):
    company_name = models.CharField(max_length=100)
    job_title = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    employment_type = models.CharField(max_length=50)
    experience_level = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.company_name} - {self.job_title}"
