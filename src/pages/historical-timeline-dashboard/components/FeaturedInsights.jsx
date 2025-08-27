import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const FeaturedInsights = ({ language }) => {
  const genderData = [
    { year: '1952', male: 95, female: 5 },
    { year: '1967', male: 92, female: 8 },
    { year: '1977', male: 88, female: 12 },
    { year: '1989', male: 85, female: 15 },
    { year: '2001', male: 82, female: 18 },
    { year: '2011', male: 78, female: 22 },
    { year: '2021', male: 75, female: 25 }
  ];

  const turnoutData = [
    { year: '1952', turnout: 65.2 },
    { year: '1957', turnout: 68.4 },
    { year: '1962', turnout: 71.8 },
    { year: '1967', turnout: 74.2 },
    { year: '1971', turnout: 72.6 },
    { year: '1977', turnout: 75.8 },
    { year: '1980', turnout: 73.4 },
    { year: '1984', turnout: 76.2 },
    { year: '1989', turnout: 78.9 },
    { year: '1991', turnout: 68.5 },
    { year: '1996', turnout: 73.8 },
    { year: '2001', turnout: 71.2 },
    { year: '2006', turnout: 74.6 },
    { year: '2011', turnout: 78.2 },
    { year: '2016', turnout: 74.3 },
    { year: '2021', turnout: 71.9 }
  ];

  const partyDominanceData = [
    { name: 'DMK', value: 35, color: '#FF0000' },
    { name: 'AIADMK', value: 32, color: '#00FF00' },
    { name: 'INC', value: 18, color: '#19AAED' },
    { name: 'Others', value: 15, color: '#64748B' }
  ];

  const milestones = [
    {
      year: '1967',
      title: language === 'en' ? 'First DMK Victory' : 'முதல் திமுக வெற்றி',
      description: language === 'en' ?'DMK wins its first election, ending Congress dominance in Tamil Nadu' :'திமுக தனது முதல் தேர்தலில் வெற்றி பெற்று, தமிழ்நாட்டில் காங்கிரஸ் ஆதிக்கத்தை முடிவுக்கு கொண்டு வந்தது',
      icon: 'Trophy'
    },
    {
      year: '1977',
      title: language === 'en' ? 'AIADMK Formation' : 'அதிமுக உருவாக்கம்',
      description: language === 'en' ?'AIADMK formed and wins first election under MGR leadership' :'எம்ஜிஆர் தலைமையில் அதிமுக உருவாக்கப்பட்டு முதல் தேர்தலில் வெற்றி',
      icon: 'Star'
    },
    {
      year: '1989',
      title: language === 'en' ? 'Highest Turnout' : 'அதிக வாக்குப்பதிவு',
      description: language === 'en' ?'Record voter turnout of 78.9% achieved in Tamil Nadu elections' :'தமிழ்நாடு தேர்தலில் 78.9% என்ற சாதனை வாக்குப்பதிவு',
      icon: 'TrendingUp'
    },
    {
      year: '1991',
      title: language === 'en' ? 'First Woman CM' : 'முதல் பெண் முதலமைச்சர்',
      description: language === 'en' ?'Jayalalithaa becomes the first woman Chief Minister of Tamil Nadu' :'ஜெயலலிதா தமிழ்நாட்டின் முதல் பெண் முதலமைச்சராக ஆனார்',
      icon: 'Crown'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {language === 'en' ? 'Featured Insights' : 'சிறப்பு நுண்ணறிவுகள்'}
        </h2>
        <p className="text-muted-foreground">
          {language === 'en' ?'Key trends and milestones in Tamil Nadu electoral history' :'தமிழ்நாடு தேர்தல் வரலாற்றில் முக்கிய போக்குகள் மற்றும் மைல்கற்கள்'
          }
        </p>
      </div>
      {/* Electoral Milestones */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          {language === 'en' ? 'Electoral Milestones' : 'தேர்தல் மைல்கற்கள்'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {milestones?.map((milestone, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={milestone?.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                    {milestone?.year}
                  </span>
                </div>
                <h4 className="font-semibold text-foreground mb-1">{milestone?.title}</h4>
                <p className="text-sm text-muted-foreground">{milestone?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gender Representation Trend */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {language === 'en' ? 'Gender Representation Over Time' : 'காலப்போக்கில் பாலின பிரதிநிதித்துவம்'}
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={genderData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="year" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-popover)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px'
                  }}
                />
                <Bar dataKey="male" fill="var(--color-primary)" name={language === 'en' ? 'Male' : 'ஆண்'} />
                <Bar dataKey="female" fill="var(--color-accent)" name={language === 'en' ? 'Female' : 'பெண்'} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Voter Turnout Trend */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {language === 'en' ? 'Voter Turnout Trend' : 'வாக்காளர் வருகை போக்கு'}
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={turnoutData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="year" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-popover)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="turnout" 
                  stroke="var(--color-success)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
                  name={language === 'en' ? 'Turnout %' : 'வாக்குப்பதிவு %'}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Party Dominance */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {language === 'en' ? 'Historical Party Dominance (1952-2021)' : 'வரலாற்று கட்சி ஆதிக்கம் (1952-2021)'}
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={partyDominanceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {partyDominanceData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--color-popover)', 
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            {partyDominanceData?.map((party, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: party?.color }}
                  />
                  <span className="font-medium text-foreground">{party?.name}</span>
                </div>
                <span className="text-sm font-bold text-foreground">{party?.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedInsights;