'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Label } from './components/ui/label';
import { AlertCircle } from 'lucide-react';

const schema = z.object({
  rank: z.number().positive('Rank must be a positive number'),
  mark: z.number().positive('Mark must be a positive number'),
  wind: z.number(),
  competitor: z.string().min(1, 'Competitor name is required'),
  dob: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date of Birth must be in YYYY-MM-DD format'),
  nationality: z.string().length(3, 'Nationality must be a 3-letter code'),
  pos: z.number().nullable(),
  venue: z.string().min(1, 'Venue is required'),
  date: z
    .string()
    .regex(/^\d{2}-[A-Za-z]{3}-\d{2}$/, 'Date must be in DD-MMM-YY format'),
  resultsScore: z.number().nullable(),
  age: z.number().int().positive('Age must be a positive integer'),
  gender: z.enum(['Male', 'Female'], 'Gender must be Male or Female'),
  sprintDistance: z.number().positive('Sprint Distance must be positive'),
  previousYearsMark: z.number().nullable(),
  peakAcceleration: z.number().nullable(),
  reactionTime: z.number().nullable(),
  heartRateDuringPerformance: z.number().nullable(),
  heartRateVariability: z.number().nullable(),
  lactateThreshold: z.number().nullable(),
  drugConsumption: z.enum(['Yes', 'No'], 'Drug Consumption must be Yes or No'),
});

function PerformanceForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    alert('Form submitted successfully!');
  };

  const formFields = [
    { name: 'rank', label: 'Rank', type: 'number' },
    { name: 'mark', label: 'Mark', type: 'number' },
    { name: 'wind', label: 'Wind', type: 'number' },
    { name: 'competitor', label: 'Competitor', type: 'text' },
    { name: 'dob', label: 'Date of Birth', type: 'date' },
    { name: 'nationality', label: 'Nationality (3-letter code)', type: 'text' },
    { name: 'pos', label: 'Position', type: 'number' },
    { name: 'venue', label: 'Venue', type: 'text' },
    { name: 'date', label: 'Date', type: 'text' },
    { name: 'resultsScore', label: 'Results Score', type: 'number' },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'] },
    { name: 'sprintDistance', label: 'Sprint Distance', type: 'number' },
    { name: 'previousYearsMark', label: 'Previous Year\'s Mark', type: 'number' },
    { name: 'peakAcceleration', label: 'Peak Acceleration', type: 'number' },
    { name: 'reactionTime', label: 'Reaction Time', type: 'number' },
    { name: 'heartRateDuringPerformance', label: 'Heart Rate', type: 'number' },
    { name: 'heartRateVariability', label: 'Heart Rate Variability', type: 'number' },
    { name: 'lactateThreshold', label: 'Lactate Threshold', type: 'number' },
    { name: 'drugConsumption', label: 'Drug Consumption', type: 'select', options: ['Yes', 'No'] },
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Performance Form</CardTitle>
        <CardDescription className="text-center">Enter athlete performance details</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formFields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>{field.label}</Label>
                {field.type === 'select' ? (
                  <Select {...register(field.name)}>
                    <SelectTrigger>
                      <SelectValue placeholder={`Select ${field.label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={field.name}
                    type={field.type}
                    {...register(field.name)}
                    className={errors[field.name] ? 'border-red-500' : ''}
                  />
                )}
                {errors[field.name] && (
                  <p className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors[field.name]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default PerformanceForm;
