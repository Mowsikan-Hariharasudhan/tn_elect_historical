import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResultsTable = ({ results, language, onViewDetails, onSort, sortConfig }) => {
  const getPartyColor = (party) => {
    const colors = {
      'DMK': 'bg-red-500',
      'AIADMK': 'bg-green-600',
      'BJP': 'bg-orange-500',
      'INC': 'bg-blue-600',
      'PMK': 'bg-yellow-500',
      'MDMK': 'bg-purple-600',
      'VCK': 'bg-indigo-600',
      'DMDK': 'bg-pink-600',
      'CPI': 'bg-red-700',
      'CPM': 'bg-red-800'
    };
    return colors?.[party] || 'bg-gray-500';
  };

  const formatVotes = (votes) => {
    return votes?.toLocaleString('en-IN');
  };

  const getMarginColor = (margin) => {
    if (margin < 1000) return 'text-red-600';
    if (margin < 5000) return 'text-orange-600';
    if (margin < 10000) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const columns = [
    {
      key: 'candidate',
      label: { en: 'Candidate', ta: 'வேட்பாளர்' },
      sortable: true
    },
    {
      key: 'constituency',
      label: { en: 'Constituency', ta: 'தொகுதி' },
      sortable: true
    },
    {
      key: 'party',
      label: { en: 'Party', ta: 'கட்சி' },
      sortable: true
    },
    {
      key: 'votes',
      label: { en: 'Votes', ta: 'வாக்குகள்' },
      sortable: true
    },
    {
      key: 'percentage',
      label: { en: 'Vote %', ta: 'வாக்கு %' },
      sortable: true
    },
    {
      key: 'margin',
      label: { en: 'Margin', ta: 'வித்தியாசம்' },
      sortable: true
    },
    {
      key: 'turnout',
      label: { en: 'Turnout %', ta: 'வாக்குப்பதிவு %' },
      sortable: true
    },
    {
      key: 'actions',
      label: { en: 'Actions', ta: 'செயல்கள்' },
      sortable: false
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              {columns?.map((column) => (
                <th
                  key={column?.key}
                  className={`px-4 py-3 text-left text-sm font-medium text-foreground ${
                    column?.sortable ? 'cursor-pointer hover:bg-muted/80' : ''
                  }`}
                  onClick={() => column?.sortable && onSort(column?.key)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column?.label?.[language]}</span>
                    {column?.sortable && (
                      <Icon name={getSortIcon(column?.key)} size={14} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {results?.map((result, index) => (
              <tr key={index} className="hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={result?.candidatePhoto}
                      alt={result?.candidateName?.[language]}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {result?.candidateName?.[language]}
                      </p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Icon name="Trophy" size={12} className="text-success" />
                        <span className="text-xs text-success font-medium">
                          {language === 'en' ? 'Winner' : 'வெற்றியாளர்'}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground">
                    {result?.constituency?.[language]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getPartyColor(result?.party)}`}></div>
                    <span className="text-sm font-medium text-foreground">{result?.party}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold text-foreground">
                    {formatVotes(result?.votes)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm font-medium text-foreground">
                    {result?.votePercentage}%
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-sm font-semibold ${getMarginColor(result?.margin)}`}>
                    {formatVotes(result?.margin)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground">
                    {result?.turnout}%
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails(result)}
                  >
                    <Icon name="Eye" size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;